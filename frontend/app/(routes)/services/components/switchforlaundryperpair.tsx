"use client"

import React from 'react'
import { ServicesColumns } from './columns'
import { Switch } from "@/components/ui/switch"

interface Props {
    data: ServicesColumns
}

export const SwitchComponentForLaundryPerPair: React.FC<Props> = ({ data }) => {
    const [checked, setChecked] = React.useState(data.laundryperpair === 'Active' ? true : false)

    return (
        <div>
            <Switch checked={checked} className=" data-[state=checked]:bg-green-500" onCheckedChange={() => setChecked(!checked)} />

        </div>
    )
}

export default SwitchComponentForLaundryPerPair