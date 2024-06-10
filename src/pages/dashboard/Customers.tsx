import Container from "@/components/Container";
import Select from "@/components/Select";

const Customers = () => {
  return (
    <div className="w-full h-full border-2 border-black">
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
            <div className="flex justify-between items-center w-full border-2 border-black">
                <h3 className="font-semibold text-size-500 text-text-bold">
                    Customers
                </h3>
                <p className="text-[#c0c0c0] hover:text-blue text-size-400 font-medium p-2">
                    See all
                </p>
            </div>
            <div className="h-full">
                <table className="table-auto">
                    <thead>
                        <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                        </tr>
                        <tr>
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>
                        <td>1972</td>
                        </tr>
                        <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </Container>
    </div>
  )
}

export default Customers