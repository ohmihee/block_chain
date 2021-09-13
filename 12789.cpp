#include<iostream>
int n, num;
int stack[10005], top, st = 1;
int main(){
    scanf("%d", &num);
    while(n--){
        scanf("%d",&num);
        if(st==num){
            st++;
        }
        else{
            while(top>0&&stack[top-1]==st){
                top--; st++;
            }
            stack[top++] = num;
        }
    }
    while (top>=1){
        if(st==stack[top-1]){
            st++; top--;
        }
        else{
            printf("Sad");return 0;
        }
    }
    printf("Nice");
    return 0;
}