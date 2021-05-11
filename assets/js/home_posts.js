{
    //methid to submit the data from sorm using ajax

    
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url : '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    new Noty({
                        theme: 'relax',
                        text:data.messege,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                      }).show();
                    let newPost = newPostDom(data.data.post);
                    $("#post-list-container>ul").prepend(newPost);
                    deletePost($('.delete-post-btn',newPost));
                    
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    

    let newPostDom = function(post){
        return $(`<li id="post-${post._id }">
        ${post.content}
        <br>
        ${post.user.name}
        
        
            <small>
                <a href="/posts/destroy/${post._id }" class="delete-post-btn"> Delete post</a>
            </small>
    
        
    
    
        <div class="post-comments">
           
                <form action="/comments/create" id="comment-post" method="POST">
                    <textarea name="comment" cols="30" rows="1" placeholder="Comment here..."></textarea>
                    <input type="hidden" name="post" value="${post._id }">
                    <button type="submit">Comment</button>
                </form>
           
    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id }">
    
                    
                </ul>
            </div>
    
        </div>
    
    </li>`)
    }


    //method to delete a post from the dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    new Noty({
                        theme: 'relax',
                        text:data.messege,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                      }).show();
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // doing this was a great task.. although i copied this.. but still 
    let convertPostsToAjax = function(){
       
        $('#post-list-container>ul>li').each(function(){
            console.log("hello");
            let self = $(this);
            let deleteButton = $(' .delete-post-btn', self);
            deletePost(deleteButton);
        });
    }
    createPost();
    convertPostsToAjax();
    
}