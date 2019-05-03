import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import {Card, Grid,Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';


class CampaignShow extends Component {
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return{
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsLength: summary[2],
            approversCount: summary[3],
            manager:summary[4]
        };
    }

    renderCards(){
      const {
          balance,
          manager,
          minimumContribution,
          approversCount,
          requestsLength
      } = this.props;

        const items = [
            {
                header:manager,
                meta:'Address of manager',
                description:'The manager created this campaign and can create requests',
                style:{overflowWrap:'break-word'}
            },
            {
                header:minimumContribution,
                meta:'Minimum Contribution(wei)',
                description: 'You must contribute at least this much'
            },
            {
                header: requestsLength,
                meta: 'Number of Requests',
                description:'A request tries to withdraw money from account'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description:'Number of people who have already dontated to the contract'
            },
            {
                header:web3.utils.fromWei(balance,"ether"),
                meta:'Balance (ether)',
                description: 'Balance is how much money left to spend'
            }

      ];

      return <Card.Group items={items}/>;
    }

    render(){
        return(
        <Layout>
        <h3>Campaign Details</h3>
            <Grid>
                <Grid.Row>
                <Grid.Column width={10}>
                    {this.renderCards()}

                </Grid.Column>

                <Grid.Column width={6}>
                    <ContributeForm address={this.props.address}/>
                </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                            <Button primary>View Requests</Button>
                        </a>
                    </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </Layout>
        );
    }
}

export default CampaignShow;