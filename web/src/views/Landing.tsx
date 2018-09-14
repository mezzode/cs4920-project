import { createStyles, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import { Nav } from "../components/common/Nav";

const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    "@global": {
        body: {
            backgroundColor: theme.palette.primary.dark
        }
    },
    content: {
        display: "flex",
        justifyContent: "space-around",
        
    }
})

interface IProps extends WithStyles<typeof styles> { }

const RawLanding: React.SFC<IProps> = ({classes}) => (
    <>
        <Nav transparent={true} />
        <div className={classes.content}>
            <Typography variant="display3" color="textPrimary">Welcome to medialog</Typography>
        </div>
    </>
);

 export const Landing = withStyles(styles)(RawLanding);
