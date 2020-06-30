import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import {
    RootState,
    selectUserLoggedIn,
} from '../../modules';

const LogoImage = require('../../assets/images/logo.svg');

const TelegramIcon = require('../../assets/images/landing/social/Telegram.svg');
const LinkedInIcon = require('../../assets/images/landing/social/LinkedIn.svg');
const TwitterIcon = require('../../assets/images/landing/social/Twitter.svg');
const YouTubeIcon = require('../../assets/images/landing/social/YouTube.svg');
const RedditIcon = require('../../assets/images/landing/social/Reddit.svg');
const FacebookIcon = require('../../assets/images/landing/social/Facebook.svg');
const MediumIcon = require('../../assets/images/landing/social/Medium.svg');
const CoinMarketIcon = require('../../assets/images/landing/social/CoinMarket.svg');


interface ReduxProps {
    isLoggedIn: boolean;
}

type Props = ReduxProps & RouteProps & InjectedIntlProps;

class legal extends React.Component<Props>{
    public renderHeader(){
        if (this.props.isLoggedIn) {
            return (
                <div className="pg-landing-screen__header">
                    <div className="pg-landing-screen__header__wrap">
                        <div className="pg-landing-screen__header__wrap__left" onClick={e => this.handleScrollTop()}>
                            <img src={LogoImage} alt="Quantumcx"/>
                        </div>
                        <div className="pg-landing-screen__header__wrap__right">
                            <Link to="/profile" className="landing-button">
                                {this.translate('page.body.landing.header.button1')}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="pg-landing-screen__header">
                <div className="pg-landing-screen__header__wrap">
                    <div className="pg-landing-screen__header__wrap__left" onClick={e => this.handleScrollTop()}>
                        <img src={LogoImage} alt="BaseApp Logo"/>
                    </div>
                    <div className="pg-landing-screen__header__wrap__right">
                        <Link to="/signin" className="landing-button landing-button--simple">
                            {this.translate('page.body.landing.header.button2')}
                        </Link>
                        <Link to="/signup" className="landing-button">
                            {this.translate('page.body.landing.header.button3')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    public renderLegal(){
        return (
            <div className="pg-legal-screen__content">
                <h1>legal Screen</h1>
            </div>
        )
    }
    public renderFooter(){
        return (
            <div className="pg-landing-screen__footer">
                <div className="pg-landing-screen__footer__wrap">
                    <div className="pg-landing-screen__footer__wrap__left" onClick={e => this.handleScrollTop()}>
                        <img src={LogoImage} alt="BaseApp Logo"/>
                    </div>
                    <div className="pg-landing-screen__footer__wrap__navigation">
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/trading/">{this.translate('page.body.landing.footer.exchange')}</Link>
                            <Link to="/wallets">{this.translate('page.body.landing.footer.wallets')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.fees')}</Link>
                        </div>
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/">{this.translate('page.body.landing.footer.faq')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.support')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.privacy')}</Link>
                        </div>
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/">{this.translate('page.body.landing.footer.about')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.community')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.info')}</Link>
                        </div>
                    </div>
                    <div className="pg-landing-screen__footer__wrap__social">
                        <div className="pg-landing-screen__footer__wrap__social__row">
                            <img src={TelegramIcon} alt="Telegram" />
                            <img src={LinkedInIcon} alt="LinkedIn" />
                            <img src={TwitterIcon} alt="Twitter" />
                            <img src={YouTubeIcon} alt="YouTube" />
                        </div>
                        <div className="pg-landing-screen__footer__wrap__social__row">
                            <img src={RedditIcon} alt="Reddit" />
                            <img src={FacebookIcon} alt="Facebook" />
                            <img src={MediumIcon} alt="MediumIcon" />
                            <img src={CoinMarketIcon} alt="CoinMarket" />
                        </div>
                    </div>
                </div>
                <span className="pg-landing-screen__footer__rights">{this.translate('page.body.landing.footer.rights')}</span>
            </div>
        );
    }
    public render(){
        return (
            <div className="pg-landing-screen">
                {this.renderHeader()}
                {this.renderLegal()}
                {this.renderFooter()}
            </div>
        );
    }
    
    private handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    private translate = (key: string) => this.props.intl.formatMessage({id: key});
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    isLoggedIn: selectUserLoggedIn(state),
});

export const legalScreen = withRouter(injectIntl(connect(mapStateToProps, null)(legal) as any));