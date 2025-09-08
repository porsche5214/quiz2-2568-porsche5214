import { useState , useEffect} from "react";
import { Button, Stack, Title, Divider, Container } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import AddExpenseModal from "../components/Modal";

type Expense = {
  id: string;
  name: string;
  amount: number | string;
  category: string;
};

export default function ExpenseTracker() {
  const [opened, setOpened] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const categories = ["Food", "Transport", "Entertainment"];

  const [modalOpened, setModalOpened] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("my-tasks");
    if (stored) {
      const parsed = JSON.parse(stored);
      setExpenses(parsed);
    }
    setExpenses(expenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("my-expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenses = (
    name: string,
    amount: number | string,
    category: string
  ) => {
    const newExpense: Expense = {
      id: uuidv4(),
      name,
      amount,
      category,
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const deleteExpenses = (expenseId: string) => {
    setExpenses((prev) => prev.filter((t) => t.id !== expenseId));
  };

  useEffect(() => {
    const stored = localStorage.getItem("my-expenses");
    if (stored) {
      const parsed = JSON.parse(stored);
      setExpenses(parsed);
    }
    setExpenses(expenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Title order={2} mb="md">
        Expense Tracker
      </Title>
      <Button onClick={() => setModalOpened(true)}>Add Expense Item</Button>
      {/* Type additional AddExpenseModal here. */}
      <AddExpenseModal
          opened={opened}
          onClose={() => setOpened(false)}
          onAdd={addExpenses}
        />

      <Divider my="md" />
      {/* Type additional total cost here. */}
      <Title order={4}>Total cost: {} Baht</Title>
      <Stack my="sm">{/* Type additional text here. */}</Stack>

      <Divider my="md" />
      {/* Type additional card here. */}
      <Stack>{/* Type additional expense card list here. */}</Stack>
    </Container>
  );
}
