import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const exchanges = () => {
 
  const { data, isFetching } = useGetExchangesQuery();
  //console.log(data)
  const exchangesList = data?.exchanges;
  console.log({exchangesList})

 // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchanges) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchanges.uuid}
                showArrow={false}
                header={(
                  <Row key={exchanges.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchanges.rank}.</strong></Text>
                      <Avatar className="exchanges-image" src={exchanges.iconUrl} />
                      <Text><strong>{exchanges.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchanges.volume)}</Col>
                    <Col span={6}>{millify(exchanges.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchanges.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchanges.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))} 
      </Row>
    </>
  );
};

export default exchanges;
