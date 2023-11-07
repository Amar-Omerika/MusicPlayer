import React from 'react'
import { View } from 'react-native'

interface Props {
    padding?: number
    children: React.ReactNode
    backgroundColor?: string
}
const Wrapper = ({ padding = 10, children }: Props) => {
    return <View style={{ padding, flex: 1 }}>{children}</View>
}

export default Wrapper
