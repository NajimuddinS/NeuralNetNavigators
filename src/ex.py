ar=[3,2,5,1]
n=len(ar)
for i in range(1,n):
    for j in range(0,n-i):
        if ar[j]>ar[j+1]:
            ar[j],ar[j+1]=ar[j+1],ar[j]

print(ar)