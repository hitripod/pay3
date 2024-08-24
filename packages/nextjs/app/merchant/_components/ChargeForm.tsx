"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import QR_Code from "./QR_Code";

const ChargeForm: NextPage = () => {
    const [amount, setAmount] = useState(0);
    const [generatedCharge, setGeneratedCharge] = useState(false);

    const handleGenerateCharge = () => {
        amount > 0 && console.log(amount);
        setGeneratedCharge(true);
    }

    return (
        <div style={{ margin: "auto" }}>
            <div className="mx-auto max-w-md space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <BanknotesIcon className="h-8 w-8 fill-secondary" />
                    <h1 className="text-3xl font-bold">Make a Charge</h1>
                </div>
                <div>
                    <input
                        onChange={(e) => setAmount(Number(e.target.value))}
                        type="text"
                        placeholder="Amount"
                        className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <button
                        className="w-full px-3 py-2 mt-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleGenerateCharge()}
                        disabled={amount <= 0}
                    >
                        Generate Charge
                    </button>
                </div>
            </div>
            <div className="mx-auto max-w-md space-y-6">
                {generatedCharge && (
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Amount to Pay Generated</h1>
                        <p className="text-muted-foreground">Share this charge with your customer</p>
                        <p className="text-muted-foreground">Amount: {amount} JPY</p>
                        <button
                          className="w-full px-3 py-2 mt-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Share as link
                        </button>
                        <button
                          className="w-full px-3 py-2 mt-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Pay with Chipi Card
                        </button>
                        <p>Or Scan QR Code:</p>
                        <QR_Code />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChargeForm;