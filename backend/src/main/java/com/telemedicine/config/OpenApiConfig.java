package com.telemedicine.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.prepost.PreAuthorize;

@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    @Bean
    public OpenAPI telemedicineOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                new SecurityScheme()
                                        .name(SECURITY_SCHEME_NAME)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .info(new Info()
                        .title("Telemedicine Consultation & EHR System API")
                        .version("1.0")
                        .description("This API handles patients, doctors, consultations, prescriptions, and electronic health records (EHR) for a comprehensive telemedicine system."));
    }

    @Bean
    public OperationCustomizer customize() {
        return (operation, handlerMethod) -> {
            boolean isPublic = handlerMethod.getMethod().getDeclaringClass().getName().contains("AuthController")
                    || handlerMethod.getMethod().getName().contains("register"); // simplistic check for the hackathon

            // If it has @PreAuthorize or is not explicitly public, add the security requirement
            if (handlerMethod.getMethodAnnotation(PreAuthorize.class) != null || !isPublic) {
                operation.addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME));
            }
            return operation;
        };
    }
}
