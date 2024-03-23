import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store.js';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';

const History = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
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

  return (
    <div>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item key={index} className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
              {Object.keys(historyItem).map(key => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>
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
    </div>
  );
};

export default History;
