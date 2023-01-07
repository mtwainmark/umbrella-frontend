import React, { useEffect } from "react";
import { Tabs, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Tabs
      style={{ marginBottom: 15 }}
      value={0}
      aria-label="basic tabs example"
      items={[
        {
          label: `Новые`,
          key: "1",
          children: (
            <Row gutter={[8, 8]}>
              <Col span={18}>
                {(isPostsLoading ? [...Array(5)] : posts.items).map(
                  (obj, index) =>
                    isPostsLoading ? (
                      <Post key={index} isLoading={true} />
                    ) : (
                      <Post
                        id={obj._id}
                        title={obj.title}
                        imageUrl={
                          obj.imageUrl
                            ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                            : ""
                        }
                        user={obj.user}
                        createdAt={obj.createdAt}
                        viewsCount={obj.viewsCount}
                        commentsCount={3}
                        tags={obj.tags}
                        isEditable
                      />
                    )
                )}
              </Col>
              <Col span={6}>
                <TagsBlock
                  items={["react", "typescript", "заметки"]}
                  isLoading={false}
                />
                <CommentsBlock
                  items={[
                    {
                      user: {
                        fullName: "Вася Пупкин",
                        avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                      },
                      text: "Это тестовый комментарий",
                    },
                    {
                      user: {
                        fullName: "Иван Иванов",
                        avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                      },
                      text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                  ]}
                  isLoading={false}
                />
              </Col>
            </Row>
          ),
        },
        {
          label: `Популярные`,
          key: "2",
          children: `Content of Tab Pane 2`,
        },
      ]}
    />
  );
};
