import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface InvoiceItem {
  item: string;
  quantity: number;
  price_per_item: number;
}

interface Invoice {
  invoice_number: string;
  date: string;
  customer_name: string;
  total_amount: number;
  items: InvoiceItem[];
}

interface InvoiceData {
  invoices: Invoice[];
}

app.post('/sumar-facturas', (req: Request, res: Response) => {
  const data: InvoiceData = req.body;
  const invoices = data.invoices;

  if (!Array.isArray(invoices)) {
    return res.status(400).json({ error: 'El formato de las facturas es inválido.' });
  }

  const total = invoices.reduce((acc: number, invoice: Invoice) => acc + invoice.total_amount, 0);

  return res.json({ total });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
