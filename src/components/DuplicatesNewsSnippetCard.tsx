import React, { useState } from "react";
import styles from "./DuplicatesNewsSnippetCard.module.scss";
import { Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { DuplicateNewsSnippetCard } from "./DuplicateNewsSnippetCard";
import { IData_DuplicatesSnippetNews } from "../types";

interface Props {
  data: IData_DuplicatesSnippetNews;
}
export const DuplicatesNewsSnippetCard: React.FC<Props> = ({ data }) => {
  const [viewMoreDuplicates, setViewMoreDuplicates] = useState(false);
  const handleViewMoreDuplicates = () => {
    setViewMoreDuplicates(!viewMoreDuplicates);
  };
  return (
    <div className={styles.card}>
      {!viewMoreDuplicates
        ? data?.slice(0, 1).map((duplicate) => {
            return (
              <DuplicateNewsSnippetCard key={duplicate.ID} data={duplicate} />
            );
          })
        : data?.map((duplicate) => {
            return (
              <DuplicateNewsSnippetCard key={duplicate.ID} data={duplicate} />
            );
          })}
      {data.length > 1 ? (
        <Button
          icon={!viewMoreDuplicates ? <DownOutlined /> : <UpOutlined />}
          style={{
            width: "100%",
            fontSize: "17px",
            marginBottom: "14px",
            padding: "18px",
          }}
          onClick={handleViewMoreDuplicates}
        >
          View Duplicates
        </Button>
      ) : null}
    </div>
  );
};
