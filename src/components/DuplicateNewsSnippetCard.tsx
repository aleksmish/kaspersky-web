import React from "react";
import { IData_DuplicateSnippetNews } from "../types";
import styles from "./DuplicateNewsSnippetCard.module.scss";
import dayjs from "dayjs";
import {
  InfoCircleOutlined,
  BorderOutlined,
  GlobalOutlined,
  UserOutlined,
  ReadOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { buildAbsolutePath, capitalize } from "../utilities";
interface Props {
  data: IData_DuplicateSnippetNews;
}

export const DuplicateNewsSnippetCard: React.FC<Props> = ({ data }) => {
  const date = dayjs(data.DP).format("DD MMM YYYY");

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <div className={styles.leftMeta} style={{ fontSize: "11px" }}>
          <div style={{ letterSpacing: "0.3px" }}>
            <p>
              <span style={{ fontWeight: "bold" }}>{date.substring(0, 2)}</span>
              {date.substring(2)}
            </p>
          </div>
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>{data.REACH}K</span> Top
              Reach
            </p>
          </div>
        </div>
        <div className={styles.rightMeta}>
          <InfoCircleOutlined style={{ fontSize: "16px", color: "#ccc" }} />
          <BorderOutlined style={{ fontSize: "16px", color: "#ccc" }} />
        </div>
      </div>

      <h1 className={styles.title}>{data.TI}</h1>

      <div className={styles.source}>
        <GlobalOutlined style={{ marginTop: 4, marginLeft: 1 }} />
        <a
          href={buildAbsolutePath(data.DOM)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          style={{ marginRight: 6, marginLeft: -2 }}
        >
          {data.DOM}
        </a>
        <span>
          {<FlagOutlined />} {data.CNTR}
        </span>
        <span>
          {<ReadOutlined />} {capitalize(data.LANG)}
        </span>
        <span>
          {data.AU.length ? (
            <>
              {<UserOutlined />} {data.AU.slice(0, 2).join(", ") + ", et al."}
            </>
          ) : null}
        </span>
      </div>
    </article>
  );
};
