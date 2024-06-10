import Container from "@/components/Container";
import Notification from "@/components/Notification";
import Select from "@/components/Select";

const Customers = () => {
  return (
    <div className="w-full h-full">
        <div className="min-h-16 w-full">
            <Container >
                <div className="flex gap-x-4">
                    <div className="w-fit h-full">
                        <Select className="border border-black" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
                    </div>
                    <div className="w-fit h-full">
                        <Select className="border border-black" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
                    </div>
                    <div className="w-fit h-full">
                        <Select className="border border-black" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
                    </div>
                    <div className="w-fit h-full">
                        <Select className="border border-black" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
                    </div>
                </div>
            </Container>
        </div>
        <Container className="mt-4 min-h-screen">
            <div className="flex justify-between items-center w-full mb-4">
                <h3 className="font-semibold text-size-500 text-text-bold">
                    Customers
                </h3>
                <p className="text-[#c0c0c0] hover:text-blue text-size-400 font-medium p-2 cursor-pointer">
                    See all
                </p>
            </div>
            <div className="h-full">
                <table className="min-w-full text-center text-sm font-light">
                    <thead className="font-medium border-b bg-black text-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">Cusromer Name</th>
                            <th scope="col" className="px-6 py-4">#ID</th>
                            <th scope="col" className="px-6 py-4">Spent</th>
                            <th scope="col" className="px-6 py-4">Last Ordered</th>
                            <th scope="col" className="px-6 py-4">Email</th>
                            <th scope="col" className="px-6 py-4">Phone Number</th>
                            <th scope="col" className="px-6 py-4">Status</th>
                            <th scope="col" className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "warning" message="pending" className="text-orange-500 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray rounded-lg cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "warning" message="pending" className="text-orange-500 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "warning" message="pending" className="text-orange-500 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray rounded-lg cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "warning" message="pending" className="text-orange-500 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "success" message="success" className="text-green-700 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray rounded-lg cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "success" message="success" className="text-green-700 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "warning" message="pending" className="text-orange-500 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm items-center flex gap-2">
                                <input type="checkbox" className=""/>
                                John Doe
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm"><Notification type = "success" message="success" className="text-green-700 rounded-md w-fit"/></td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-6 w-full flex justify-between">
                <div className="w-fit h-full">
                    <Select className="border border-black" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
                </div>
                <div className="w-48 h-10 border-2 border-black">

                </div>
            </div>
        </Container>
    </div>
  )
}

export default Customers