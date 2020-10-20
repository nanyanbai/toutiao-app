<template>
    <div class="login-container">
      <van-nav-bar
        class="app-nav-bar"
        title="登录"
        lett-arrow
        @click-left="$router.back()"
      />

      <!--登录表单-->
      <!--
        基于 Vant 的表单验证：
        1、使用 van-form 组件包裹所有的表单项  van-field
        2、给 van-form 绑定submit 事件
          当表单提交的时候会触发 submit 事件
        3、使用 field 的rules 属性定义校验规则
      -->
      <van-form
        ref="login-form"
        :show-error="false"
        :show-error-message="false"
        validate-first
        @failed="onFailed"
        @submit="onLogin"
      >
        <van-cell-group>
          <van-field
            v-model="user.mobile"
            clearable
            center
            icon-prefix="toutiao"
            left-icon="shouji"
            placeholder="请输入手机号"
            name="mobile"
            :rules="formRules.mobile"
          />
          <van-field
            v-model="user.code"
            clearable
            center
            icon-prefix="toutiao"
            left-icon="yanzhengma"
            placeholder="请输入验证码"
            name="code"
            :rules="formRules.code"
          >
            <template #button>
              <van-count-down
                class="van-count-down"
                v-if="isCountDownShow"
                :time="1000 * 60"
                format="ss s"
                @finish="isCountDownShow = false"
              />
              <van-button
                v-else
                class="send-code-btn"
                size="small"
                round
                :loading="isSendSmsLoading"
                @click.prevent="onSendCode"
              >发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="login-btn-wrap">
          <van-button
            class="login-btn"
            block
            type="info"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
      <!--/登录表单-->
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import { Toast } from  'vant'

export default {
  name: "LoginIndex",
  data(){
    return {
      user:{
        mobile:'13911111111',
        code:'246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false , // 控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false // 发送验证码的loading
    }
  },
  methods:{
    async onLogin () {
      this.$toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        const res  =  await  login(this.user)
        console.log(res)
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态（token等数据）放到Vuex 容器中
        this.$store.commit('setUser', res.data.data)
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },

    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },

    async onSendCode () {
      // 校验手机号码
      try {
        await this.$refs['login-form'].validate('mobile')

        // 验证通过， 请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的loading 的状态，防止网络慢用户多次点击触发发送行为

        await sendSms(this.user.mobile)

        // 短信发出去了， 隐藏发送按钮， 显示倒计时
        this.isCountDownShow = true
      }catch (err) {
        let message = ''
        if(err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          // 未知错误
          message = '发送失败， 请稍后重试'
        }
        this.$toast({
          message: err.message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后丢呀关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false

      // 验证通过 -> 请求发送验证码 -> 用户接受短信 -> 输入验证码 -> 请求登录
      // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
      // 倒计时结束 -> 隐藏倒计时，显示发送按钮
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      border-color: unset;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
  .send-code-btn{
    /*width: 76px;*/
    height: 23px;
    background-color: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666;
    }
    .van-count-down{
      border: 1px solid #e5e5e5;
    }
  }
}
</style>
