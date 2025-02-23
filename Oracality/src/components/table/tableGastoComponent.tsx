import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface TableComponentProps {
  head: {
    title: string;
    aling: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  }[];
  Body: React.ReactNode;
}

export function TableComponent({
  head,
  Body,
}: TableComponentProps) {
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {head.map((item, index) => (
                <TableCell align={item.aling} key={item.title || index}>
                  {item.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{Body}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
