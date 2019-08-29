//ask-sdkの読み込み
const Alexa = require('ask-sdk-core');
//expressの読み込み
const express = require('express');
//ExpressAdapterの読み込み
const { ExpressAdapter } = require('ask-sdk-express-adapter');

// MARK: 定数群
const PORT_NO = 3000; 
const SKILL_PATH = '/';

// MARK: Handlerの定義

// スキル起動のHandler
const LaunchHandler = {
    canHandle(handlerInput) {
        return Util.checkIntentTypeName(handlerInput, 'LaunchRequest');
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('ハローワールド') 
            .getResponse();
    }
}

// ヘルプのHandler
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return (Util.checkIntentTypeName(handlerInput, 'IntentRequest', 'AMAZON.HelpIntent'));
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('使い方を読み上げますよ') 
            .getResponse();
    }
}


// スキル終了のHandler
const SkillEndHandler = {
    canHandle(handlerInput) {
        return (
            Util.checkIntentTypeName(handlerInput, 'IntentRequest', 'AMAZON.CancelIntent')
            || Util.checkIntentTypeName(handlerInput, 'IntentRequest', 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('スキルを終了します。') 
            .getResponse();
    }
}

// エラー発生時のHandler
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('申し訳ありません。内部エラーが発生致しました。再度、スキルを立ち上げ直してください。') 
            .getResponse();
    },
};

// MARK: 初期化関連
const app = express();

const skillBuilder = Alexa.SkillBuilders.custom()
                            .addRequestHandlers(
                                LaunchHandler,
                                HelpIntentHandler,
                                SkillEndHandler
                            )
                            .addErrorHandlers(ErrorHandler)

const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

app.post(SKILL_PATH, adapter.getRequestHandlers());
app.listen(PORT_NO);