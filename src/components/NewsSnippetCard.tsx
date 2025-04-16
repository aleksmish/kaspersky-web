import React, { ReactNode, useEffect, useState } from "react";
import styles from "./NewsSnippetCard.module.scss";
import { Tag, Button, Space, Dropdown, MenuProps } from "antd";
import { IData_SnippetNews } from "../types";
import {
  BorderOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  FlagOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DuplicatesNewsSnippetCard } from "./DuplicatesNewsSnippetCard";
import { duplicatesTestData } from "../mock";
import { buildAbsolutePath, capitalize } from "../utilities";

interface Props {
  data: IData_SnippetNews;
}

const DEFAULT_AMOUNT_OF_KW_SHOWN = 6;

export const NewsSnippetCard: React.FC<Props> = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Relevance");
  const [duplicates, setDuplicates] = useState(duplicatesTestData);

  const date = dayjs(data.DP).format("DD MMM YYYY");
  // как пример, каждый язык можно обозначить соответствующим флагом
  const langFlags: Record<string, ReactNode> = {
    fr: <FlagOutlined />,
    at: <FlagOutlined />,
    de: <FlagOutlined />,
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Relevance",
    },
    {
      key: "2",
      label: "Date",
    },
    {
      key: "3",
      label: "Reach",
    },
  ];

  useEffect(() => {
    if (selectedSortOption.toLowerCase() === "date") {
      const sorted = [...duplicates].sort(
        (a, b) => dayjs(a.DP).valueOf() - dayjs(b.DP).valueOf()
      );
      setDuplicates(sorted);
    } else if (selectedSortOption.toLowerCase() === "reach") {
      const sorted = [...duplicates].sort((a, b) => a.REACH - b.REACH);
      setDuplicates(sorted);
    } else {
      setDuplicates([...duplicates]);
    }
  }, [selectedSortOption]);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };
  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };
  const handleSortOptionClick: MenuProps["onClick"] = ({ key }) => {
    const selected = items.find((item) => item?.key === key);

    if (selected && "label" in selected && typeof selected.label === "string") {
      setSelectedSortOption(selected.label);
    }
  };
  const handleOriginalSourceClick = (URL: string) => {
    window.open(buildAbsolutePath(URL), "_blank", "noopener,noreferrer");
  };

  function highlightKeywords(text: string): string {
    return text.replace(
      /<kw>(.*?)<\/kw>/g,
      `<span class=${styles.highlighted}>$1</span>`
    );
  }

  return (
    <div className={styles.card}>
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
              <span style={{ fontWeight: "bold" }}>{data.REACH}K</span> Reach
            </p>
          </div>
          <p>
            <span
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              Top Traffic:&nbsp;
              {data.TRAFFIC?.slice(0, 3).map((traffic) => {
                return (
                  <span key={traffic.value}>
                    {traffic.value}{" "}
                    <span style={{ fontWeight: "bold", letterSpacing: "-1px" }}>
                      {Math.round(traffic.count * 100)}%
                    </span>
                  </span>
                );
              })}
            </span>
          </p>
        </div>
        <div className={styles.rightMeta}>
          <Tag
            style={{
              color: "black",
              margin: 0,
              fontSize: "9px",
              padding: "0px 7px",
              height: "20px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            color={data.SENT === "positive" ? "#87e757" : "#e84343"}
          >
            {capitalize(data.SENT)}
          </Tag>
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
          {langFlags[data.CNTR_CODE] ?? <FlagOutlined />} {data.CNTR}
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

      <div className={styles.content}>
        {!showMore
          ? data.HIGHLIGHTS?.[0] && (
              <span
                style={{ display: "inline-block" }}
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(data.HIGHLIGHTS[0]),
                }}
              />
            )
          : data.HIGHLIGHTS?.[0] && (
              <span
                style={{ display: "inline-block" }}
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(data.HIGHLIGHTS.join(" ")),
                }}
              />
            )}
        <Button
          variant="text"
          color="default"
          onClick={handleShowMoreClick}
          style={{
            color: "#4da6ff",
            padding: "0",
          }}
        >
          Show more{" "}
          {!showMore ? (
            <CaretDownOutlined style={{ marginTop: "3px", marginLeft: -3 }} />
          ) : (
            <CaretUpOutlined style={{ marginTop: "3px", marginLeft: -3 }} />
          )}
        </Button>
      </div>

      <div className={styles.tags}>
        {!showAll
          ? data.KW.slice(0, 6).map((tag) => (
              <span
                key={tag.value}
                className={styles.tagSpan}
              >{`${tag.value} ${tag.count}`}</span>
            ))
          : data.KW.map((tag) => (
              <span
                key={tag.value}
                className={styles.tagSpan}
              >{`${tag.value} ${tag.count}`}</span>
            ))}
        {data.KW.length > 6 ? (
          <Button
            variant="text"
            color="default"
            onClick={handleShowAllClick}
            style={{
              color: "#4da6ff",
              padding: "0",
              marginLeft: "10px",
              fontSize: "12px",
            }}
          >
            {!showAll
              ? `Show All + ${data.KW.length - DEFAULT_AMOUNT_OF_KW_SHOWN}`
              : "Close"}
          </Button>
        ) : null}
      </div>

      <Button
        variant="text"
        color="default"
        style={{
          color: "#4da6ff",
          backgroundColor: "#3e444b",
          padding: "12px 6px",
          borderRadius: "8px",
          marginTop: "-6px",
        }}
        onClick={() => handleOriginalSourceClick(data.DOM)}
      >
        Original Source
      </Button>
      <article className={styles.duplicates}>
        <div className={styles.duplicatesHeader}>
          <p>
            Duplicates{" "}
            <span style={{ fontWeight: "bold", marginLeft: 3 }}>
              {duplicates.length}
            </span>
          </p>
          <div style={{ letterSpacing: "0.46px" }}>
            <div>
              <span>By </span>
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  defaultSelectedKeys: ["1"],
                  onClick: handleSortOptionClick,
                }}
                trigger={["click"]}
              >
                <span style={{ cursor: "pointer" }}>
                  <Space>
                    {selectedSortOption}
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <DuplicatesNewsSnippetCard
            data={duplicates}
          ></DuplicatesNewsSnippetCard>
        </div>
      </article>
    </div>
  );
};
