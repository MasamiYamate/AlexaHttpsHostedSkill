# AlexaHttpsHostedSkill
Alexa Https Hosted demo skill

# 事前準備
スキルを動かすマシンには下記を事前設定する必要があります。

・nginx
・forever

# Install
プロジェクト直下で、下記コマンドを実行し依存モジュールをInstallします。
```
$ cd AlexaHttpsHostedSkill
$ npm install
```

スキルのパスに対して、スキルが立ち上がるlocalhostのアドレスを指定します。
```
location / {
        proxy_pass http://localhost:【skill run port no】/;
}
```

設定後、下記コマンドを実行してnginxをリロードさせます。
```
$ sudo nginx -s reload
```

# Run
プロジェクト直下で、下記コマンドを実行します。
```
$ cd AlexaHttpsHostedSkill
$ forever start index.js
```

# Skill setting
Alexa developer consoleからスキルのエンドポイントをhttpsのアドレスで指定します。
