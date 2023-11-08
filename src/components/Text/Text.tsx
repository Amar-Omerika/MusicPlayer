import React from 'react'
import { Text, useWindowDimensions } from 'react-native'

// Define an index signature for the fontSizes object
type FontSizes = {
    [key: string]: number
}
// Constants for font size scaling based on device resolution
const fontSizes: FontSizes = {
    h1: 36,
    h2: 26,
    h3: 24,
    h4: 22,
    h5: 20,
    h6: 17,
    h7: 16,
    body1: 15,
    body2: 14,
    body3: 12,
    body4: 11,
    body5: 30,
    body6: 18,
    smallCaps: 8,
    largeCaps: 66
}
// Define an index signature for the colors object
type Colors = {
    [key: string]: string
}
// Default colors
const colors: Colors = {
    white: '#FFF',
    black: '#000',
    lightGrey: '#e3e3e3',
    darkgrey: '#575855',
    mediumGrey: '#798082',
    darkBlue: '#191f27',
    yellow: '#efb80d',
    mediumBlue: '#36525b',
    darkGreen: '#344c4b',
    lightGreen: '#3b6c74',
    blue: '#3c647c'
}
// Define an index signature for the colors object
type Typographies = {
    [key: string]: string
}
// Default typographies
const typographies: Typographies = {
    default: 'Cantarell-Regular',
    bold: 'Cantarell-Bold',
    italic: 'Cantarell-Italic'
}
interface Props {
    children?: React.ReactNode
    fontSize?: string
    color?: string
    typography?: string
    style?: any
    center?: any
    fontWeight?: any
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
    numberOfLines?: number
}
const CustomText = ({
    children,
    fontSize = 'body1',
    color = 'white',
    typography = 'default',
    fontWeight = 'normal',
    style = null,
    center = false,
    ellipsizeMode, // Receive ellipsizeMode as a prop
    numberOfLines // Receive numberOfLines as a prop
}: Props) => {
    // Calculate font scale based on phone settings
    const { fontScale } = useWindowDimensions()

    // Calculate font size with scaling
    const scaledFontSize = fontSizes[fontSize] / fontScale

    return (
        <Text
            // {...otherProps}
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            style={[
                {
                    fontWeight: isNaN(fontWeight)
                        ? fontWeight
                        : parseInt(fontWeight), // Parse numeric values
                    fontSize: scaledFontSize,
                    color: colors[color],
                    fontFamily: typographies[typography],
                    textAlign: center ? 'center' : 'left'
                },
                style
            ]}
        >
            {children}
        </Text>
    )
}

export default CustomText
