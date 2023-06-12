import React from "react";
function Table2({ tableName, tableData, columnNames }) {

    console.log(tableName, tableData, columnNames);

    return (
        <>
            <div className="container my-12 px-6 mx-auto">
                <section className="mb-32 text-center">
                    <div className="mx-auto px-3 lg:px-6">
                        <h2 className="text-3xl font-bold mb-12">{tableName}</h2>
                        {/* Table of Doctors with column Name Department Degree and Access Toggle Button */}
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    {columnNames.map((column, index) => {
                                                        return (
                                                            <th key={index}
                                                                scope="col"
                                                                className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                {column}
                                                            </th>
                                                        )
                                                    }
                                                    )}
                                                  
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {tableData.map((item, index) => {
                                                    const keys = columnNames;
                                                    return (
                                                        <tr key={index}>
                                                            {
                                                                keys.map((key, i) => {
                                                                    console.log("key: ", key);
                                                                    console.log("value: ", item[key]);
                                                                    return (
                                                                        <td key={i} className="px-3 py-4 whitespace-nowrap">
                                                                            <div className="flex">
                                                                                <div className="ml-4">
                                                                                    <div className="text-sm text-left font-medium text-gray-900">

                                                                                        {item[key]}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    )

                                                                })
                                                            }
                                                            
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Table2;