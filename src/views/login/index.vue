<template>
    <div class="login-container">
      <van-nav-bar
        title="登录"
        lett-arrow
        @click-left="$router.back()"
      />

      <!--登录表单-->
      <van-form @submit="onLogin">
        <van-cell-group>
          <van-field
            v-model="user.mobile"
            clearable
            center
            left-icon="smile-o"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="user.code"
            clearable
            center
            left-icon="music-o"
            placeholder="请输入验证码"
          >
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <van-button round block size="small" type="info" native-type="submit">
          提交
        </van-button>
      </van-form>
      <!--/登录表单-->
    </div>
</template>

<script>
  export default {
    name: "LoginIndex",
    data(){
      return {
        user:{
          mobile:'',
          code:''
        }
      }
    },
    methods:{
      onLogin() {

      }
    }
  }
</script>

<style scoped>

</style>
