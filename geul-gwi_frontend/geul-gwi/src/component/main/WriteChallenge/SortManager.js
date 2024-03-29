import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from "react-icons/fi";
import PostContainer from 'component/main/WriteChallenge/PostContainer';

const SortManager = (props) => {
    const [posts, setPosts] = useState(props.posts);
    const [sortTabShow, setSortTabShow] = useState(false);
    const [selectedSort, setSelectedSort] = useState("정렬");

    const handleTabShowToggle = () => {
        setSortTabShow(prevState => !prevState);
    }

    const SortFunc = useCallback((sortby, label) => {
        const sortedItems = [...props.posts].sort((a, b) => {
            if (sortby === "popular") return b.likeCount - a.likeCount;
            if (sortby === "newest") return new Date(b.regDate) - new Date(a.regDate);
            if (sortby === "oldest") return new Date(a.regDate) - new Date(b.regDate);
            return 0;
        });

        setPosts(sortedItems);
        setSelectedSort(label);
    }, [props.posts]);

    useEffect(() => {
        setPosts(props.posts);
    }, [props.posts]);

    return (
        <Frame>
            <ManagerFrame>
                <SortButton onClick={handleTabShowToggle}>
                    {selectedSort}<FiChevronDown />
                </SortButton>
                {sortTabShow &&
                    <TabFrame onMouseLeave={handleTabShowToggle}>
                        <Item onClick={() => SortFunc("popular", "인기순")}>인기순</Item>
                        <Item onClick={() => SortFunc("newest", "최신순")}>최신순</Item>
                        <Item onClick={() => SortFunc("oldest", "오래된순")}>오래된순</Item>
                    </TabFrame>
                }
            </ManagerFrame>
            <PostContainer posts={posts} setPosts={props.setPosts} />
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    width: calc(100% - 40px);
    min-height: 20px;
    height: auto;
    padding: 10px 0px 0px 20px;
    flex-direction: column;
    align-items: center;
`;

const ManagerFrame = styled.div`
    position: relative;
    display: flex;
    width: calc(100%);
    min-height: 10px;
    height: auto;
    margin-right: 40px;
    justify-content: flex-end;
`;

const SortButton = styled.div`
    display: flex;
    min-width: 90px;
    width: auto;
    height: 28px;
    border-radius: 16px;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    border: 3px solid #ccebb5;
    background-color: #ccebb5;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s; /* Transition effect on background-color and text color */

    &:hover {
        background-color: white;
        color: rgba(40, 40, 40, 1);
    }
`;

const TabFrame = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    display: flex;
    position: absolute;
    z-index: 1;
    width: 90px;
    min-height: 20px;
    height: auto;
    background-color: white;
    border-radius: 16px;
    box-shadow: 1px 1px 10px 2px rgba(40,40,40,0.2);
    padding: 10px 5px 10px 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const Item = styled.div`
    display: flex;
    width: 100%;
    height: 15px;
    padding: 5px 0px 5px 0px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: rgba(40,40,40,0.1);
    }
`;

export default SortManager;
