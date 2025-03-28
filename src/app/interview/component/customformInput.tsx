import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import shadcn Select
import FormControl from "@mui/material/FormControl";

interface CustomInputProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    currencyName?: string;
    jobTypeName?: string;
}

const CustomInputForm: React.FC<CustomInputProps> = ({
                                                         name, label, placeholder, type = "text", currencyName, jobTypeName
                                                     }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
                <Box sx={{ width: "100%" }}>
                    <TextField
                        {...field}
                        fullWidth
                        label={label}
                        placeholder={placeholder}
                        variant="outlined"
                        type={type}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message || ""}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                height: "60px",
                                borderRadius: "14px",
                            },
                            "& .MuiInputBase-input::placeholder": {
                                fontFamily: "Open Sans",
                                fontSize: "10px",
                                fontWeight: 400,
                            },
                        }}
                        InputProps={{
                            startAdornment: jobTypeName ? (
                                <InputAdornment position="start">
                                    <Controller
                                        name={jobTypeName}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormControl sx={{ minWidth: 140 }}>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-[140px] text-black">
                                                        <SelectValue placeholder="Job Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Onsite" className="text-black">Onsite</SelectItem>
                                                        <SelectItem value="Remote" className="text-black">Remote</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </InputAdornment>
                            ) : currencyName ? (
                                <InputAdornment position="start">
                                    <Controller
                                        name={currencyName}
                                        control={control}
                                        defaultValue="USD"
                                        render={({ field }) => (
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>

                                                    <SelectTrigger className="w-[100px] text-black text-[16px] font-normal font-[Open Sans]">
                                                        <SelectValue placeholder="currency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="USD" className="text-black">USD</SelectItem>
                                                        <SelectItem value="AED" className="text-black">AED</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </InputAdornment>
                            ) : null,
                        }}
                    />
                </Box>
            )}
        />
    );
};

export default CustomInputForm;
