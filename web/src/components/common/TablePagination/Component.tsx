// import { Theme } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import { withStyles } from '@material-ui/core/styles';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
// import * as React from 'react';

// const actionsStyles = (theme: Theme) => ({
//     root: {
//         color: theme.palette.text.secondary,
//         flexShrink: 0,
//         marginLeft: theme.spacing.unit * 2.5,
//     },
// });

// interface Props {
//     classes: {};
//     count: number;
//     onChangePage: React.EventHandler<any>;
//     page: number;
//     rowsPerPage: number;
//     theme: {};
// }

// class TablePaginationActions extends React.Component<Props> {
//     constructor(props: Props) {
//         super(props);
//     }

//     public handleFirstPageButtonClick: React.EventHandler = event => {
//         this.props.onChangePage(event, 0);
//     };

//     public handleBackButtonClick = event => {
//         this.props.onChangePage(event, this.props.page - 1);
//     };

//     public handleNextButtonClick = event => {
//         this.props.onChangePage(event, this.props.page + 1);
//     };

//     public handleLastPageButtonClick = event => {
//         this.props.onChangePage(
//             event,
//             Math.max(
//                 0,
//                 Math.ceil(this.props.count / this.props.rowsPerPage) - 1,
//             ),
//         );
//     };

//     public render() {
//         const { classes, count, page, rowsPerPage, theme } = this.props;

//         return (
//             <div className={classes.root}>
//                 <IconButton
//                     onClick={this.handleFirstPageButtonClick}
//                     disabled={page === 0}
//                     aria-label="First Page"
//                 >
//                     {theme.direction === 'rtl' ? (
//                         <LastPageIcon />
//                     ) : (
//                         <FirstPageIcon />
//                     )}
//                 </IconButton>
//                 <IconButton
//                     onClick={this.handleBackButtonClick}
//                     disabled={page === 0}
//                     aria-label="Previous Page"
//                 >
//                     {theme.direction === 'rtl' ? (
//                         <KeyboardArrowRight />
//                     ) : (
//                         <KeyboardArrowLeft />
//                     )}
//                 </IconButton>
//                 <IconButton
//                     onClick={this.handleNextButtonClick}
//                     disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//                     aria-label="Next Page"
//                 >
//                     {theme.direction === 'rtl' ? (
//                         <KeyboardArrowLeft />
//                     ) : (
//                         <KeyboardArrowRight />
//                     )}
//                 </IconButton>
//                 <IconButton
//                     onClick={this.handleLastPageButtonClick}
//                     disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//                     aria-label="Last Page"
//                 >
//                     {theme.direction === 'rtl' ? (
//                         <FirstPageIcon />
//                     ) : (
//                         <LastPageIcon />
//                     )}
//                 </IconButton>
//             </div>
//         );
//     }
// }

// const TablePaginationComponent = withStyles(actionsStyles, {
//     withTheme: true,
// })(TablePaginationActions);
