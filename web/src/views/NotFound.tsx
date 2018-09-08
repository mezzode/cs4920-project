import { Typography, WithStyles } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import Nav from "../components/common/Nav";

const styles = createStyles({
    content: {
        display: "flex",
        justifyContent: "space-around",

    }
});

interface IProps extends WithStyles<typeof styles> { }

const NotFound: React.SFC<IProps> = ({ classes }) => (
    <>
        <Nav/>
        <div className={classes.content}>
            <Typography variant="display3">404</Typography>
        </div>
    </>
);

export default withStyles(styles)(NotFound);
