import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";

type AddExpenseModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (name: string, amount: number | string, category: string) => void;
};

export default function AddExpenseModal({
  opened,
  onClose,
  onAdd,
}: AddExpenseModalProps) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string | number>(0);
  const [category, setCategory] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name.trim() || !amount || !category) return;
    onAdd(name, amount, category);
    setName("");
    setAmount("");
    setCategory(null);
    onClose();
  };

  // หากต้องการแปง type string เป็น type number สามารถดูตัวอย่างนี้ได้
  let val_number: number = Number("500.0");
  console.log(val_number + 100); // 600.0

  return (
    <Modal opened={opened} onClose={onClose} title="Add Expense">
      <Stack>
        <TextInput
          label="Input label"
          withAsterisk
          description="Input name"
          error={!name.trim() && "Expense Name is required"}
          placeholder="Input placeholder"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <NumberInput
          label="Input label"
          description="Input amount"
          error={!amount && "Amount is required"}
          placeholder="Input placeholder"
          value={amount}
          onChange={(setAmount)}
        />
        <Select
          label="Your favorite library"
          placeholder="Pick value"
          data={["Food", "Transport", "Entertainment"]}
          error={!category?.trim() ? "Category is required" : false}
          value={category}
          onChange={(setCategory)}
        />
        <Button onClick={handleSubmit}>Save</Button>
      </Stack>
    </Modal>
  );
}
