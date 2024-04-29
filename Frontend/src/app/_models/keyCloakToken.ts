import {JsonObject, JsonProperty} from "json2typescript";
@JsonObject("KeyCloakToken")
export class KeyCloakToken {
        @JsonProperty('access_token')
        AccessToken: string;

        @JsonProperty('expires_in')
        ExpiresIn: number;

        @JsonProperty('refresh_expires_in')
        RefreshExpiresIn: number;

        @JsonProperty('refresh_token')
        RefreshToken: string;

        @JsonProperty('token_type')
        TokenType: string;

        @JsonProperty('not-before-policy')
        NotBeforePolicy: number;

        @JsonProperty('session_state')
        SessionState: string;

        @JsonProperty('scope')
        Scope: string;
}

