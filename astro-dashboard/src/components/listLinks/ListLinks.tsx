import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styleTitleList } from "./style";

export interface ILinks {
  label: string;
  link: string;
}
interface IListLinksProps {
  title: string;
  listLinks: ILinks[];
}

const ListLink = ({ title, listLinks }: IListLinksProps) => {
  return (
    <List dense={true}>
      <ListItem>
        <ListItemText
          sx={styleTitleList}
          disableTypography={true}
          primary={title}
        />
      </ListItem>
      {listLinks.map((e, i) => {
        return (
          <ListItem key={`${e.label}-${i}`}>
            <ListItemText primary={e.label} />
          </ListItem>
        );
      })}
    </List>
  );
};
export default ListLink;
