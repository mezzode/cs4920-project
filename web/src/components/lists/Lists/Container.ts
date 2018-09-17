// this stuff  should prolly just be part of the /user/:displayName/lists/:mediaType route
// import * as React from 'react';
// import { EntryList, MediaType } from '../../../types';

// interface State {
//     readonly lists: EntryList[] | null;
// }

// interface Props {
//     readonly userDisplayName: string; // e.g. provided by route which is parent
//     readonly mediaType: MediaType;
// }

// export class ListsContainer extends React.Component<Props, State> {
//     public state = {
//         lists: null,
//     };

//     public async componentDidMount() {
//         const { userDisplayName, mediaType } = this.props;
//         const res = await fetch(`/user/${userDisplayName}/lists/${mediaType}`);
//         const lists = (await res.json()) as EntryList[];
//         this.setState({ lists });
//     }
// }
