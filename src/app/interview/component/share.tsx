import {
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
} from 'next-share';

interface SocialShareProps {
    url: string;  // URL to share
    title: string; // Title to share
}

const SocialShare = ({ url, title }: SocialShareProps) => {
    return (
        <div className="flex space-x-4 justify-center mt-6">
            {/* Telegram Share */}
            <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>

            {/* Twitter Share */}
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            {/* Whatsapp Share */}
            <WhatsappShareButton url={url} title={title} separator=":: ">
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            {/* Linkedin Share */}
            <LinkedinShareButton url={url}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            {/* Facebook Messenger Share */}
            <FacebookMessengerShareButton url={url} appId="">
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
        </div>
    );
};

export default SocialShare;
