import React, {useEffect} from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Container, ListGroup, Button, Card } from 'react-bootstrap';
import { searchHistoryAtom } from '../store';
import styles from '@/styles/History.module.css'

const History = () => {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    const historyClicked = (e, index) => {
        e.preventDefault();
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = (e, index) => {
        e.stopPropagation(); // stop the event from triggering other events
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1);
            return x;
        });
    };

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    useEffect(() => {
        console.log("Search history:", searchHistory);
    }, [searchHistory]);

    return (
        <Container>
            <h1>Search History</h1>
            {parsedHistory.length > 0 ? (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item
                        key={index}
                        className={styles.historyListItem}
                        onClick={(e) => historyClicked(e, index)}
                    >
                        {/* Content of each ListGroup.Item */}
                        {Object.keys(historyItem).map((key) => (
                            <span key={key}>
                                {key}: <strong>{historyItem[key]}</strong>&nbsp;
                            </span>
                        ))}
                        {/* Button to remove the history item */}
                        <Button
                            className="float-end"
                            variant="danger"
                            size="sm"
                            onClick={(e) => removeHistoryClicked(e, index)}
                        >
                            &times;
                        </Button>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try searching for some artwork.
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default History;

// const History = () => {
//     const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
//     const router = useRouter();

//     // Log the search history to the console
//     console.log("Search History:", searchHistory);

//     const historyClicked = (e, index) => {
//         e.preventDefault();
//         router.push(`/artwork?${searchHistory[index]}`);
//     };

//     const removeHistoryClicked = (e, index) => {
//         e.stopPropagation(); // stop the event from triggering other events
//         setSearchHistory(current => {
//             let x = [...current];
//             x.splice(index, 1);
//             return x;
//         });
//     };

//     let parsedHistory = [];

//     searchHistory.forEach(h => {
//         let params = new URLSearchParams(h);
//         let entries = params.entries();
//         parsedHistory.push(Object.fromEntries(entries));
//     });

//     return (
//         <Container>
//             <h1>Search History</h1>
//             {parsedHistory.length > 0 ? (
//                 <ListGroup>
//                     {parsedHistory.map((historyItem, index) => (
//                         <ListGroup.Item
//                         key={index}
//                         className={styles.historyListItem}
//                         onClick={(e) => historyClicked(e, index)}
//                     >
//                         {/* Content of each ListGroup.Item */}
//                         {Object.keys(historyItem).map((key) => (
//                             <span key={key}>
//                                 {key}: <strong>{historyItem[key]}</strong>&nbsp;
//                             </span>
//                         ))}
//                         {/* Button to remove the history item */}
//                         <Button
//                             className="float-end"
//                             variant="danger"
//                             size="sm"
//                             onClick={(e) => removeHistoryClicked(e, index)}
//                         >
//                             &times;
//                         </Button>
//                     </ListGroup.Item>
//                     ))}
//                 </ListGroup>
//             ) : (
//                 <Card>
//                     <Card.Body>
//                         <h4>Nothing Here</h4>
//                         Try searching for some artwork.
//                     </Card.Body>
//                 </Card>
//             )}
//         </Container>
//     );
// };

// export default History;

