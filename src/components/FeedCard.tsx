import React, { MutableRefObject } from 'react';
import { observer } from 'mobx-react';
import { Grid, Button, Modal } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import blue from '../assets/pngs/blue.png';
import blue2x from '../assets/pngs/blue@2x.png';
import blue3x from '../assets/pngs/blue@3x.png';
import onImg from '../assets/pngs/on-img.png';
import onImg2x from '../assets/pngs/on-img@2x.png';
import onImg3x from '../assets/pngs/on-img@3x.png';

interface Feed {
    id: number;
    image_url: string;
    nickname: string;
    profile_image_url: string;
}

interface FeedCardProps {
    feed: Feed;
    isScrapped: boolean;
    unScrapFeed: (arg0: Feed) => void;
    scrapFeed: (arg0: Feed) => void;
    ref?: MutableRefObject<HTMLInputElement | null>;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        }
    })
);

const FeedCard = ({
    feed,
    isScrapped,
    unScrapFeed,
    scrapFeed
}: FeedCardProps) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function toggleScrap() {
        if (isScrapped) unScrapFeed(feed);
        else scrapFeed(feed);
        handleClose();
    }
    return (
        <Grid container className="feed_card">
            <Grid
                item
                xs={12}
                className="feed_card_header"
                container
                alignItems="center"
            >
                <Grid item>
                    <img
                        src={feed.profile_image_url}
                        className="ic_avatar_cat"
                        alt="ic_avatar_cat"
                    />
                </Grid>
                <Grid item className="feed_card_nickname">
                    {feed.nickname}
                </Grid>
            </Grid>
            <Grid item xs={12} className="feed_card_image_container">
                <img
                    src={feed.image_url}
                    className="feed_card_image"
                    alt="feed_card_image"
                />
                <div
                    onClick={handleOpen}
                    className="feed_card_toggle"
                    onKeyDown={handleOpen}
                    role="button"
                >
                    {isScrapped ? (
                        <img
                            src={blue}
                            srcSet={`${blue2x} 2x,
                        ${blue3x} 3x`}
                            className="feed_card_toggle_image"
                            alt="bt_checkbox_checked"
                        />
                    ) : (
                        <img
                            src={onImg}
                            srcSet={`${onImg2x} 2x,
                    ${onImg3x} 3x`}
                            className="feed_card_toggle_image"
                            alt="bt_checkbox_checked"
                        />
                    )}
                </div>
            </Grid>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">
                        {isScrapped
                            ? '스크랩을 취소하시겠습니까?'
                            : '사진을 스크랩하시겠습니까?'}
                    </h2>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={toggleScrap}
                    >
                        네
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        아니요
                    </Button>
                </div>
            </Modal>
        </Grid>
    );
};

export default observer(FeedCard);
