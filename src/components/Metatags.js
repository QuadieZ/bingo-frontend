import { MetaTags } from "react-meta-tags"

export const Metatags = () => {
    return (
        <MetaTags>
            <meta
                name="description"
                content="Cultural trip bingo for KMUTT Leadership Camp 2022"
            />
            <meta property="og:title" content="Leadership Bingo!" />
            <meta
                property="og:image"
                content="https://res.cloudinary.com/dw4rbfcmr/image/upload/v1658642365/ldbingo/Screen_Shot_2565-07-24_at_12.59.14_wpbmd2.png"
            />
        </MetaTags>
    )
}