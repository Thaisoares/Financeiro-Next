"use client";

import { useState } from "react";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { Transaction } from "@prisma/client";

interface Props {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsDialogOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
