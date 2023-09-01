import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import { dataFetch } from "../../../functions/requests";
import { TagRes } from "../../../utils/dataTypes";

export default function TagsMultiSelect({
    setTagIds,
  }: {
    setTagIds: React.Dispatch<React.SetStateAction<number[]>>;
  }) {
    const [tags, setTags] = useState<TagRes[]>([]);
    const [selectedTag, setSelectedTag] = useState<string[]>([]);
  
    const handleChange = (event: SelectChangeEvent<string[]>) => {
      setSelectedTag(event.target.value as string[]);
  
      const selectedTagIds = tags
        .filter((tag) => event.target.value.includes(tag.name))
        .map((tag) => tag.id);
  
      setTagIds(selectedTagIds);
    };
  
    useEffect(() => {
      dataFetch("Tags").then((res) => {
        setTags(res);
      });
    }, []);
  
    //TODO: PAss to this component the setTags from parent. on the parent, when submiting form filter tags and get ids/
    return (
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTag}
          onChange={handleChange}
          renderValue={(selected: string[]) => selected.join(", ")}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.name}>
              <Checkbox checked={selectedTag.indexOf(tag.name) > -1} />
              <ListItemText primary={tag.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  
  