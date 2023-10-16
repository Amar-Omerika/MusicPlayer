import React from 'react'
import { View } from 'react-native'

interface Props {
    padding?: number
    children: React.ReactNode
}
const Wrapper = ({ padding = 10, children }: Props) => {
    return <View style={{ padding: padding }}>{children}</View>
}

export default Wrapper
