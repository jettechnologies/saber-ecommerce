import Container from "@/components/Container";
import Select from "@/components/Select";

const Adminstrators = () => {
  return (
    <Container className="mt-4 min-h-screen">
            <div className="flex justify-between items-center w-full mb-4">
                <h3 className="font-semibold text-size-500 text-text-bold">
                    Administrators
                </h3>
            </div>
            <div className="h-full">
                <table className="min-w-full text-center text-sm font-light">
                    <thead className="font-medium border-b bg-black text-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">#ID</th>
                            <th scope="col" className="px-6 py-4">Date</th>
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="px-6 py-4">Email</th>
                            <th scope="col" className="px-6 py-4">Role</th>
                            <th scope="col" className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                        </tr>
                        <tr className="border border-gray hover:bg-gray cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">1</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">Lorem ipsum dolor sit.</td>
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
  )
}

export default Adminstrators