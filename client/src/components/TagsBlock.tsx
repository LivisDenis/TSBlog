import React, {FC} from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import SideBlock from "./SideBlock";

type TagsBlockType = {
    items: string[]
}

const TagsBlock: FC<TagsBlockType> = ({ items }) => {
    const isLoading = true
    return (
        <SideBlock title="Тэги">
            <List>
                <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/tags/`}
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TagIcon />
                            </ListItemIcon>
                            {isLoading ? (
                                <Skeleton width={100} />
                            ) : (
                                <ListItemText primary={''} />
                            )}
                        </ListItemButton>
                    </ListItem>
                </a>
            </List>
        </SideBlock>
    );
};

export default TagsBlock