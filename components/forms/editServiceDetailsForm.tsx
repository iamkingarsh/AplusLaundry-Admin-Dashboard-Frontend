"use client"

import * as React from "react"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import { Textarea } from "../ui/textarea"
import { Card } from "../ui/card"
import Image from "next/image"
import { Switch } from "../ui/switch"
import { Select, SelectTrigger } from "../ui/select"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { ScrollArea } from "../ui/scroll-area"
import { set } from "date-fns"
import { LaundrtProducts as Items } from "@/app/(routes)/products/page"


interface EditServiceFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
    data: any
}


const formSchema = z.object({
    title: z.string().min(2, { message: "Service title is required" }),
    laundrybykg: z.string(),
    laundrybykgprice: z.string(),
    laundryperpair: z.string(),
    laundryitems: z.object({
        laundrybykg_items: z.array(z.string()),
        laundryperpair_items: z.array(z.string()),
    }).partial()


})

export function EditServiceForm({ className, data, gap, ...props }: EditServiceFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            laundrybykg: data.laundrybykg === 'Active' ? 'Activated' : 'Deactivated',
            laundrybykgprice: data.laundrybykgprice,
            laundryperpair: data.laundryperpair === 'Active' ? 'Activated' : 'Deactivated',
            laundryitems: {
                laundrybykg_items: Object.keys(data.laundry_items).map((item: any) => data.laundry_items[item].product_id),
                laundryperpair_items: Object.keys(data.laundry_items).map((item: any) => data.laundry_items[item].product_id),

            }
        },

    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here

        setIsLoading(true)
        console.log(values)

        setTimeout(() => {
            setIsLoading(false)
            toast.success('Customer created successfully')
        }, 3000) // remove this timeout and add submit logic

    }

    const [selectedItemsForLPK, setSelectedItemsForLPK] = React.useState<any>(form.watch("laundryitems.laundrybykg_items"));
    const [selectedItemsForLPP, setSelectedItemsForLPP] = React.useState<any>(form.watch("laundryitems.laundryperpair_items"));



    const isOptionSelected = (value: string, laundrytype: string): any => {
        return laundrytype === "laundrybykg" ? selectedItemsForLPK.includes(value) : selectedItemsForLPP.includes(value);
    };

    const handleSelectChange = (value: string, laundrytype: string): any => {
        if (laundrytype === "laundrybykg") {
            if (selectedItemsForLPK.includes(value)) {
                setSelectedItemsForLPK(selectedItemsForLPK.filter((item: any) => item !== value));
            } else {
                setSelectedItemsForLPK([...selectedItemsForLPK, value]);
            }
        } else {
            if (selectedItemsForLPP.includes(value)) {
                setSelectedItemsForLPP(selectedItemsForLPP.filter((item: any) => item !== value));
            } else {
                setSelectedItemsForLPP([...selectedItemsForLPP, value]);
            }
        }
    }

    React.useEffect(() => {

        console.log('items', Object.keys(data.laundry_items).map((item: any) => data.laundry_items[item].product_id))
    }, [data])


    return (
        <div className={cn("grid gap-6 ", className)} {...props}>


            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-3">
                    <div className={`grid grid-cols-${gap} gap-3`}>
                        {/* <div className={`grid grid-cols-2 gap-3`}> */}
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Service Title</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="title"
                                            type="text"
                                            autoComplete="off"
                                            disabled={isLoading}
                                            {...field}
                                            placeholder="eg. Laundry"
                                        />
                                        {/* @ mujahed Replace this by creating a cloudinary image upload component */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="laundrybykg"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="laundrybykg">Laundry By KG</FormLabel>
                                    <FormControl>
                                        <Card className="flex h-9 rounded-md p-1 px-4 items-center justify-between">
                                            <span className="text-sm">Activate Service</span>
                                            <Switch
                                                className="data-[state=checked]:bg-green-500 data-[state=checked]:text-wj"
                                                checked={form.watch("laundrybykg") === "Activated" ? true : false}
                                                onCheckedChange={
                                                    form.watch("laundrybykg") === "Activated" ? () => form.setValue("laundrybykg", "Deactivated") : () => form.setValue("laundrybykg", "Activated")
                                                }
                                                id="laundryperpair"  {...field} />
                                        </Card>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="laundryperpair"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="laundryperpair">Laundry Per Pair</FormLabel>
                                    <FormControl>
                                        <Card className="flex h-9 rounded-md p-1 px-4 items-center justify-between">
                                            <span className="text-sm">Activate Service</span>
                                            <Switch
                                                className="data-[state=checked]:bg-green-500"
                                                checked={form.watch("laundryperpair") === "Activated" ? true : false}
                                                onCheckedChange={
                                                    form.watch("laundryperpair") === "Activated" ? () => form.setValue("laundryperpair", "Deactivated") : () => form.setValue("laundryperpair", "Activated")
                                                }
                                                id="laundryperpair"  {...field} />
                                        </Card>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.watch("laundrybykg") === 'Activated' &&
                            <FormField
                                name="laundrybykgprice"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="laundrybykgprice">Laundry By KG Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="eg. 50"
                                                id="laundrybykgprice"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                        {form.watch("laundrybykg") === 'Activated' && <FormField
                            name="laundryitems.laundrybykg_items"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="products"> Select Laundry By Kg Items</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >

                                                Select Laundry Items
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full" onCloseAutoFocus={(e) => e.preventDefault()}>
                                            <DropdownMenuLabel>Select Products</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="outline">Open Items Catalogue</Button>
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>Select Laundry Items</SheetTitle>
                                                        <SheetDescription>
                                                            Please select the products
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <ScrollArea className="h-[85%] my-2 px-2 rounded-md ">


                                                        <div className="grid gap-4 py-4">
                                                            <Card
                                                                onSelect={(e) => e.preventDefault()}

                                                                // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                className="flex gap-2 p-2 justify-between items-center"
                                                            >

                                                                <div>
                                                                    All
                                                                </div>
                                                                <div className="flex gap-2 items-center justify-end">

                                                                    <Switch className="data-[state=checked]:bg-green-500" checked={
                                                                        selectedItemsForLPK.length === Items.length ? true : false

                                                                    } onCheckedChange={
                                                                        () => {
                                                                            if (selectedItemsForLPK.length === Items.length) {
                                                                                setSelectedItemsForLPK([])
                                                                            } else {
                                                                                setSelectedItemsForLPK(Items.map((item: any) => item.product_id))
                                                                            }
                                                                        }
                                                                    } id="laundrybykg" />

                                                                </div>

                                                            </Card>
                                                            {Items.map((value: any, index: number) => {
                                                                return (

                                                                    <Card
                                                                        onSelect={(e) => e.preventDefault()}
                                                                        key={index}
                                                                        // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                        className="flex gap-2 p-2 justify-between items-center"
                                                                    >

                                                                        <div>
                                                                            {value.product_name}
                                                                        </div>
                                                                        <div className="flex gap-2 items-center justify-end">

                                                                            <Switch className="data-[state=checked]:bg-green-500" checked={isOptionSelected(value.product_id, "laundrybykg")} onCheckedChange={() => handleSelectChange(value.product_id, "laundrybykg")} id="laundrybykg" />
                                                                        </div>

                                                                    </Card>

                                                                )
                                                            })}




                                                        </div>
                                                    </ScrollArea>
                                                    <SheetFooter className="flex w-full items-center md:justify-between">

                                                        <SheetClose asChild>
                                                            {/* <Button onClick={() => { form.setValue("products", { ...selectedItems }); console.log(form.setValue("products", selectedItems), { ...selectedItems }) }} type="submit">Save changes</Button> */}

                                                            <Button onClick={() => {

                                                                form.setValue("laundryitems.laundrybykg_items", [...selectedItemsForLPK]);


                                                            }} type="submit">Save changes</Button>

                                                        </SheetClose>
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />}
                        {form.watch("laundryperpair") === 'Activated' && <FormField
                            name="laundryitems.laundryperpair_items"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="products"> Select Laundry Per Pair Items</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >

                                                Select Laundry Items
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full" onCloseAutoFocus={(e) => e.preventDefault()}>
                                            <DropdownMenuLabel>Select Laundry Items</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="outline">Open Items Catalogue</Button>
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>Select Products</SheetTitle>
                                                        <SheetDescription>
                                                            Please select the products
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <ScrollArea className="h-[85%] my-2 px-2 rounded-md ">


                                                        <div className="grid gap-4 py-4">
                                                            <Card
                                                                onSelect={(e) => e.preventDefault()}

                                                                // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                className="flex gap-2 p-2 justify-between items-center"
                                                            >

                                                                <div>
                                                                    All
                                                                </div>
                                                                <div className="flex gap-2 items-center justify-end">

                                                                    <Switch className="data-[state=checked]:bg-green-500" checked={
                                                                        selectedItemsForLPP.length === Items.length ? true : false

                                                                    } onCheckedChange={
                                                                        () => {
                                                                            if (selectedItemsForLPP.length === Items.length) {
                                                                                setSelectedItemsForLPP([])
                                                                            } else {
                                                                                setSelectedItemsForLPP(Items.map((item: any) => item.product_id))
                                                                            }
                                                                        }
                                                                    } id="laundrybykg" />

                                                                </div>

                                                            </Card>
                                                            {Items.map((value: any, index: number) => {
                                                                return (

                                                                    <Card
                                                                        onSelect={(e) => e.preventDefault()}
                                                                        key={index}
                                                                        // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                        className="flex gap-2 p-2 justify-between items-center"
                                                                    >

                                                                        <div>
                                                                            {value.product_name}
                                                                        </div>
                                                                        <div className="flex gap-2 items-center justify-end">

                                                                            <Switch className="data-[state=checked]:bg-green-500" checked={isOptionSelected(value.product_id, "laundryperpair")} onCheckedChange={() => handleSelectChange(value.product_id, "laundryperpair")} id="laundryperpair" />
                                                                        </div>

                                                                    </Card>

                                                                )
                                                            })}




                                                        </div>
                                                    </ScrollArea>
                                                    <SheetFooter className="flex w-full items-center md:justify-between">

                                                        <SheetClose asChild>
                                                            {/* <Button onClick={() => { form.setValue("products", { ...selectedItems }); console.log(form.setValue("products", selectedItems), { ...selectedItems }) }} type="submit">Save changes</Button> */}

                                                            <Button onClick={() => {

                                                                form.setValue("laundryitems.laundryperpair_items", [...selectedItemsForLPP]);


                                                            }} type="submit">Save changes</Button>

                                                        </SheetClose>
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />}

                    </div>
                    <div className='' >
                        {
                            form.watch("laundrybykg") === 'Activated' && form.watch("laundrybykgprice") !== '0' && (form.watch("laundryitems.laundrybykg_items") ?? []).length > 0 ||
                                form.watch("laundryperpair") === 'Activated' && (form.watch("laundryitems.laundryperpair_items") ?? []).length > 0
                                ?
                                <Button type="submit" className="w-fit" disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                                    )}
                                    Update
                                </Button>
                                :
                                <Button type="submit" className="w-fit" disabled>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                                    )}
                                    Update
                                </Button>
                        }

                    </div>

                </form>
            </Form>




        </div >
    )
}