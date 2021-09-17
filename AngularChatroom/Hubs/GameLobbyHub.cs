﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace AngularChatroom.Hubs
{
    public class GameLobbyHub : Hub
    {
        public Task SendPlayerReady(string user)
        {
            return Clients.All.SendAsync("RecieveReady", user);
        }

    }
}