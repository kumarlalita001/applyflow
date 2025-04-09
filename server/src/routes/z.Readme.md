// Errors can be occurred in routing

1. Mismatch of http method . MEANS in code post but we are requesting with get 
2. missing  / . MEANS doing router.get("login") instead of router.get("/login") 
3. suffix / can't create any error but 