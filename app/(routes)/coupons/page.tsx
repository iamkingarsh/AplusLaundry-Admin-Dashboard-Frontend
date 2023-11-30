import { NewCustomerForm } from '@/components/forms/newCustomerForm';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Create New Customer | APLus Laundry',
    description: 'Create a New customer | APLus Laundry',
}

interface Props {
    params: {
        customerid: string;
    }
}


export default function CustomerPage({ params }: Props) {
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight ' title='Coupons' />
                    <p className='text-muted-foreground text-sm'>Manage your coupons here! </p>
                </div>
                <Link href={'/coupons/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>
            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">

            </div>


        </div>

    )
}



