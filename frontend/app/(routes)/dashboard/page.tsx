// "use client"
import CreateNew from '@/components/create-new'
import { RevenueGraph } from '@/components/revenue-graph'
import StatsCard from '@/components/statscard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { IndianRupeeIcon, ShoppingBagIcon, Users } from 'lucide-react'
import RecentOrders from '@/components/recent-orders'
import { DatePickerWithRange } from '@/components/date-range'
import { roles } from '@/lib/constants'


export default function page() {

    const currentUsersRole = 'manager'

    const StatsData = [
        {
            title: 'Total Revenue',
            stat: 2300,
            statPrefix: '$',
            icon: <IndianRupeeIcon />,
            desc: '+180.1% from last month',
            href: '/revenue'
        },
        {
            title: 'Total Orders',
            stat: 30,
            statPrefix: '+',
            icon: <ShoppingBagIcon />,
            desc: '+180.1% from last month',
            href: '/orders'
        },
        {
            title: 'Total Subscribers',
            stat: 350,
            statPrefix: '+',
            icon: <Users />,
            desc: '+180.1% from last month',
            href: '/customers'
        },
        {
            title: 'Total Subscriber Orders',
            stat: 230,
            statPrefix: '+',
            icon: <ShoppingBagIcon />,
            desc: '+180.1% from last month',
            href: '/customers'
        },
    ]

    return (
        <>
            <div className='w-full space-y-4 h-full flex p-6 flex-col'>
                <div className="topbar w-full flex justify-between">
                    <Heading className='leading-tight' title='Dashboard' />
                    <div className='flex gap-2'>
                        <DatePickerWithRange />
                        <CreateNew />
                    </div>
                </div>
                <div className='w-full flex gap-2'>
                    {StatsData.map((data, index) => {
                        return (
                            <StatsCard key={index} title={data.title} statPrefix={data.statPrefix} stat={data.stat} icon={data.icon} href={data.href} desc={data.desc} />
                        )
                    })}
                </div>
                <div className='space-x-2 flex'>
                    {

                        <Card className='w-full'>
                            <CardHeader>
                                <Heading title='Sales Overview' />
                            </CardHeader>
                            <CardContent>
                                <RevenueGraph />

                            </CardContent>
                        </Card>
                    }
                    <Card className='w-full'>
                        <CardHeader>
                            <Heading title='Recent Orders' />
                        </CardHeader>
                        <CardContent>
                            <RecentOrders />

                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}