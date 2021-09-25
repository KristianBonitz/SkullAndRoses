﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace AngularChatroom.Hubs
{
    public class GameHub : Hub
    {
        public Task SendPlayerReady(object user)
        {
            return Clients.All.SendAsync("RecieveReady", user);
        }

        public Task StartGame(bool state)
        {
            return Clients.All.SendAsync("StartingGame", state);
        }

        public Task SendStackCount(string user, int numOfCards)
        {
            return Clients.All.SendAsync("RecieveStackCount", user, numOfCards);
        }

        public Task RevealStack(string user, int[] cards)
        {
            return Clients.All.SendAsync("RecievePlayerStack", user, cards);
        }
    }
}