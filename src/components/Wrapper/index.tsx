import React from 'react'
import { View } from 'react-native'

interface Props {
    padding?: number
    children: React.ReactNode
    backgroundColor?: string
    marginBottom?: number
}
const Wrapper = ({ padding = 10, children, marginBottom }: Props) => {
    return (
        <View style={{ padding, flex: 1, marginBottom: marginBottom }}>
            {children}
        </View>
    )
}

export default Wrapper
