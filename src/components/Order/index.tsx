import { TabPanel } from '../../components';
import * as React from 'react';
import { OrderForm } from '../';

export type FormType = 'buy' | 'sell';

export type DropdownElem = number | string | React.ReactNode;

export interface OrderProps {
    type: FormType;
    orderType: string | React.ReactNode;
    price: number | string;
    amount: number | string;
    available: number;
}

export type OnSubmitCallback = (order: OrderProps) => void;

export interface OrderComponentProps {
    /**
     * Amount of money in base currency wallet
     */
    availableBase: number;
    /**
     * Amount of money in quote currency wallet
     */
    availableQuote: number;
    /**
     * Callback which is called when a form is submitted
     */
    onSubmit: OnSubmitCallback;
    /**
     * If orderType is 'Market' this value will be used as price for buy tab
     */
    priceMarketBuy: number;
    /**
     * If orderType is 'Market' this value will be used as price for sell tab
     */
    priceMarketSell: number;
    /**
     * If orderType is 'Limit' this value will be used as price
     */
    priceLimit?: number;
    /**
     * Name of currency for price field
     */
    from: string;
    /**
     * Name of currency for amount field
     */
    to: string;
    /**
     * Whether order is disabled to execute
     */
    disabled?: boolean;
    handleSendType?: (index: number, label: string) => void;
    /**
     * Index of tab to switch on
     */
    /**
     * Precision of amount, total, available, fee value
     */
    currentMarketAskPrecision: number;
    /**
     * Precision of price value
     */
    currentMarketBidPrecision: number;
    /**
     * @default 'Order Type'
     * Text for order type dropdown label.
     */
    orderTypeText?: string;
    /**
     * @default 'Price'
     * Text for Price field Text.
     */
    priceText?: string;
    /**
     * @default 'Amount'
     * Text for Amount field Text.
     */
    amountText?: string;
    /**
     * @default 'Total'
     * Text for Total field Text.
     */
    totalText?: string;
    /**
     * @default 'Available'
     * Text for Available field Text.
     */
    availableText?: string;
    /**
     * @default 'BUY'
     * Text for buy order submit button.
     */
    submitBuyButtonText?: string;
    /**
     * @default 'SELL'
     * Text for sell order submit button.
     */
    submitSellButtonText?: string;
    /**
     * @default 'Buy'
     * Text for Buy tab label.
     */
    submitUserLogginText?: string;
    labelFirst?: string;
    /**
     * @default 'Sell'
     * Text for Sell tab label.
     */
    labelSecond?: string;
    orderTypes: DropdownElem[];
    orderTypesIndex?: DropdownElem[];
    /**
     *
     */
    width?: number;
    /**
     * proposals for buy
     */
    bids: string[][];
    /**
     * proposals for sell
     */
    asks: string[][];
    /**
     * start handling change price
     */
    listenInputPrice?: () => void;

    userLoggedIn?: boolean;
}
interface State {
    index: number;
    indexOrderType: number;
    orderSelected: string;
}

const defaultOrderTypes: DropdownElem[] = [
    'Limit',
    'Market',
    'Stop Limit',
    'OCO' 
];

const splitBorder = 449;
const defaultWidth = 635;


class Order extends React.PureComponent<OrderComponentProps, State> {
    public state = {
        index: 0,
        indexOrderType: 0,
        orderSelected: 'Limit',
    };

    public render() {
        const {
            width = defaultWidth,
            orderTypes
        } = this.props;

        if (width < splitBorder) {
            return (
                <div className="cr-order">
                    <div className="cr-order-hidden">
                        <TabPanel
                            fixed={true}
                            panels={[
                                {content:(<div></div>), label: String(orderTypes[0])},
                                {content:(<div></div>), label: String(orderTypes[1])},
                                {content:(<div></div>), label: String(orderTypes[2]), disabled: true},
                                {content:(<div></div>), label: String(orderTypes[3]), disabled: true}
                            ]}
                            onTabChange={this.handleChangeTabOrderType}
                            currentTabIndex={this.state.indexOrderType}
                        />
                    </div>
                    <TabPanel
                        fixed={true}
                        panels={this.getPanels()}
                        onTabChange={this.handleChangeTab}
                        currentTabIndex={this.state.index}
                    />
                </div>
            );
        }

        return (
            <div className="cr-order">  
                <div className="cr-order-hidden">
                    <TabPanel
                        fixed={true}
                        panels={[
                            {content:(<div></div>), label: String(orderTypes[0])},
                            {content:(<div></div>), label: String(orderTypes[1])},
                            {content:(<div></div>), label: String(orderTypes[2]), disabled: true},
                            {content:(<div></div>), label: String(orderTypes[3]), disabled: true}
                        ]}
                        onTabChange={this.handleChangeTabOrderType}
                        currentTabIndex={this.state.indexOrderType}
                    />
                </div>
                <div className="cr-order cr-order--extended">
                    <div className="cr-order--extended__buy">
                        <TabPanel
                            fixed={true}
                            panels={this.getPanelsBuy()}
                            onTabChange={this.handleChangeTab}
                            currentTabIndex={this.state.index}
                        />
                    </div>
                    <div className="cr-order--extended__sell">
                        <TabPanel
                            fixed={true}
                            panels={this.getPanelsSell()}
                            onTabChange={this.handleChangeTab}
                            currentTabIndex={this.state.index}
                        />
                    </div>
                </div>
            </div>
        );
    }
    private handleChangeTabOrderType = (index: number, label?: string) => {
        this.setState({
            indexOrderType: index,
            orderSelected: String(defaultOrderTypes[index]),
        });
    }


    private getPanels = () => {
        const {
            availableBase,
            availableQuote,
            disabled,
            priceMarketBuy,
            priceMarketSell,
            priceLimit,
            from,
            to,
            currentMarketAskPrecision,
            currentMarketBidPrecision,
            orderTypeText,
            priceText,
            amountText,
            totalText,
            availableText,
            submitBuyButtonText,
            submitSellButtonText,
            submitUserLogginText,
            labelFirst,
            labelSecond,
            orderTypes,
            orderTypesIndex,
            asks,
            bids,
            listenInputPrice,
            userLoggedIn,
        } = this.props;
        const { orderSelected } = this.state
        return [
            {
                content: (
                    <OrderForm
                        proposals={asks}
                        disabled={disabled}
                        type="buy"
                        from={from}
                        to={to}
                        orderSelected={orderSelected}
                        available={availableQuote}
                        priceMarket={priceMarketBuy}
                        priceLimit={priceLimit}
                        onSubmit={this.props.onSubmit}
                        orderTypes={orderTypes ? orderTypes : defaultOrderTypes}
                        orderTypesIndex={orderTypesIndex ? orderTypesIndex : defaultOrderTypes}
                        currentMarketAskPrecision={currentMarketAskPrecision}
                        currentMarketBidPrecision={currentMarketBidPrecision}
                        orderTypeText={orderTypeText}
                        priceText={priceText}
                        amountText={amountText}
                        totalText={totalText}
                        availableText={availableText}
                        submitButtonText={userLoggedIn ? submitBuyButtonText : submitUserLogginText}
                        listenInputPrice={listenInputPrice}

                        userLoggedIn={userLoggedIn}
                    />
                ),
                label: labelFirst ? labelFirst : 'Buy',
            },
            {
                content: (
                    <OrderForm
                        proposals={bids}//
                        type="sell"//
                        from={from}//
                        to={to}//
                        orderSelected={orderSelected}
                        available={availableBase}//
                        priceMarket={priceMarketSell}//
                        priceLimit={priceLimit}
                        onSubmit={this.props.onSubmit}
                        orderTypes={orderTypes ? orderTypes : defaultOrderTypes}
                        orderTypesIndex={orderTypesIndex ? orderTypesIndex : defaultOrderTypes}
                        currentMarketAskPrecision={currentMarketAskPrecision}
                        currentMarketBidPrecision={currentMarketBidPrecision}
                        orderTypeText={orderTypeText}
                        priceText={priceText}
                        amountText={amountText}
                        totalText={totalText}
                        availableText={availableText}
                        submitButtonText={userLoggedIn ? submitSellButtonText : submitUserLogginText}
                        listenInputPrice={listenInputPrice}

                        userLoggedIn={userLoggedIn}
                    />
                ),
                label: labelSecond ? labelSecond : 'Sell',
            },
        ];
    };

    private getPanelsBuy = () => {
        const {
            availableQuote,
            disabled,
            priceMarketBuy,
            priceLimit,
            from,
            to,
            currentMarketAskPrecision,
            currentMarketBidPrecision,
            orderTypeText,
            priceText,
            amountText,
            totalText,
            availableText,
            submitBuyButtonText,
            submitUserLogginText,
            labelFirst,
            orderTypes,
            orderTypesIndex,
            asks,
            listenInputPrice,
            userLoggedIn
        } = this.props;
        const { orderSelected } = this.state
        return [
            {
                content: (
                    <OrderForm
                        proposals={asks}
                        disabled={disabled}
                        type="buy"
                        from={from}
                        to={to}
                        orderSelected={orderSelected}
                        available={availableQuote}
                        priceMarket={priceMarketBuy}
                        priceLimit={priceLimit}
                        onSubmit={this.props.onSubmit}
                        orderTypes={orderTypes ? orderTypes : defaultOrderTypes}
                        orderTypesIndex={orderTypesIndex ? orderTypesIndex : defaultOrderTypes}
                        currentMarketAskPrecision={currentMarketAskPrecision}
                        currentMarketBidPrecision={currentMarketBidPrecision}
                        orderTypeText={orderTypeText}
                        priceText={priceText}
                        amountText={amountText}
                        totalText={totalText}
                        availableText={availableText}
                        submitButtonText={userLoggedIn ? submitBuyButtonText : submitUserLogginText}
                        listenInputPrice={listenInputPrice}

                        userLoggedIn={userLoggedIn}
                    />
                ),
                label: labelFirst ? labelFirst : 'Buy',
            },
        ];
    };

    private getPanelsSell = () => {
        const {
            availableBase,
            priceMarketSell,
            priceLimit,
            from,
            to,
            currentMarketAskPrecision,
            currentMarketBidPrecision,
            orderTypeText,
            priceText,
            amountText,
            totalText,
            availableText,
            submitSellButtonText,
            submitUserLogginText,
            labelSecond,
            orderTypes,
            orderTypesIndex,
            bids,
            listenInputPrice,
            userLoggedIn
        } = this.props;
        const { orderSelected } = this.state
        return [
            {
                content: (
                    <OrderForm
                        proposals={bids}
                        type="sell"
                        from={from}
                        to={to}
                        orderSelected={orderSelected}
                        available={availableBase}
                        priceMarket={priceMarketSell}
                        priceLimit={priceLimit}
                        onSubmit={this.props.onSubmit}
                        orderTypes={orderTypes ? orderTypes : defaultOrderTypes}
                        orderTypesIndex={orderTypesIndex ? orderTypesIndex : defaultOrderTypes}
                        currentMarketAskPrecision={currentMarketAskPrecision}
                        currentMarketBidPrecision={currentMarketBidPrecision}
                        orderTypeText={orderTypeText}
                        priceText={priceText}
                        amountText={amountText}
                        totalText={totalText}
                        availableText={availableText}
                        submitButtonText={userLoggedIn ? submitSellButtonText : submitUserLogginText}
                        listenInputPrice={listenInputPrice}

                        userLoggedIn={userLoggedIn}
                    />
                ),
                label: labelSecond ? labelSecond : 'Sell',
            },
        ];
    };

    private handleChangeTab = (index: number, label?: string) => {
        if (this.props.handleSendType && label) {
          this.props.handleSendType(index, label);
        }

        this.setState({
            index: index,
        });
    }
}

export {
    Order,
};
