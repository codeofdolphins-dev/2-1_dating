import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const contestTitles = [
    "Secret Erotic Fantasies",
    "My Wildest Group Sex Experience",
    "My Kinkiest Sexcapade",
    "Funniest Sex Blooper",
    "My First Lifestyle Club Experience",
    "Dogging in the Snow",
    "My Juiciest Orgasm",
    "Sexiest Halloween Party",
    "My Hottest Summer Sex Story",
    "Outdoor Sex Adventures",
    "My First Bisexual Experience",
    "Sexiest Couple Swap Experience",
    "Secret Erotic Fantasies",
    "My Wildest Group Sex Experience",
    "My Kinkiest Sexcapade",
    "Funniest Sex Blooper",
    "My First Lifestyle Club Experience",
    "Dogging in the Snow",
    "My Juiciest Orgasm",
    "Sexiest Halloween Party",
    "My Hottest Summer Sex Story",
    "Outdoor Sex Adventures",
    "My First Bisexual Experience",
    "Sexiest Couple Swap Experience",
    "Secret Erotic Fantasies",
    "My Wildest Group Sex Experience",
    "My Kinkiest Sexcapade",
    "Funniest Sex Blooper",
    "My First Lifestyle Club Experience",
    "Dogging in the Snow",
    "My Juiciest Orgasm",
    "Sexiest Halloween Party",
    "My Hottest Summer Sex Story",
    "Outdoor Sex Adventures",
    "My First Bisexual Experience",
    "Sexiest Couple Swap Experience"
];

const splitArrayInChunks = (arr, chunkCount) => {
    const result = Array.from({ length: chunkCount }, () => []);
    arr.forEach((item, i) => {
        result[i % chunkCount].push(item);
    });
    return result;
};

const PastContestContainer = () => {
    const columns = splitArrayInChunks(contestTitles, 3);

    return (
        <Container className="text-white py-4">
            <Row>
                {columns.map((col, colIndex) => (
                    <Col key={colIndex} md={4}>
                        <ul className="list-unstyled">
                            {col.map((title, index) => (
                                <li key={index} className="mb-5">{title}</li>
                            ))}
                        </ul>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PastContestContainer;
