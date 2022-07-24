import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                color: 'content.primary'
            }
        },
        Heading: {
            baseStyle: {
                color: 'content.primary'
            }
        }
    },
    colors: {
        brand: {
            primary: '#0078AA',
            secondary: '#3AB4F2'
        },
        bg: {
            light: '#F6F6F6'
        },
        content: {
            primary: '#303030',
            contrast: '#F6F6F6',
            yellow: '#F4BB29',
            orange: '#ED9121',
            red: '#F87474'
        }
    },
    fonts: {
        heading: `'Quicksand', sans-serif`,
        body: `'Quicksand', sans-serif`
    }
})

export const placeColorToken = {
    all: 'brand.secondary',
    palace: 'content.yellow',
    arun: 'content.orange',
    po: 'content.red'
}